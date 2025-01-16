import { useEffect, useState } from "react";
import { onDistrict } from "../../network/actions/district";
import { useDispatch, useSelector } from "react-redux";
import { getBlock, getDistrict, getPanchayat, getToken, getVillage } from "../../utils/cookie";
import { Button, Grid, InputLabel } from "@mui/material";
import Select from "react-select";
// districe, block, panchayat, village
import { onMunicipalityList } from "../../network/actions/municipality";
import { onBlockList } from "../../network/actions/block";
import { onPanchayatList } from "../../network/actions/panchayat";
import { onWardList } from "../../network/actions/wards";
import { onWardListSurveyor } from "../../network/actions/wards";
import { onVillageList } from "../../network/actions/villages";
import { id } from "date-fns/locale";
import DatePickerNew from "../DatePicker";
import { downloadData } from "../../network/actions/downloadData";
import { useRouter } from "next/router";

export default function Filters({ onChange }) {
  const router = useRouter();
  const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };

  const [districtList, setDistrictList] = useState([]);
  const [municipalityList, setMunicipalityList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [panchayatList, setPanchayatList] = useState([]);

  const [filterData, setFilterData] = useState({
    district: "",
    municipal: "",
    ward: "",
    block: "",
    panchayat: "",
    village: "",
  });

  const handleChangeFilter = (e, name) => {
    if (name == "area") {

      setFilterData({  [name]: e })
    } else if (name == "district") {
      setFilterData({ ...filterData, [name]: e, block: "", panchayat: "", village: "", municipal : "", ward : "" })

    } else if (name == "municipal") {
      setFilterData({ ...filterData, [name]: e, block: "", panchayat: "", village: "",  ward: "" })

    } else if (name == "ward") {
      setFilterData({ ...filterData, [name]: e, block: "", panchayat: "", village: "" })

    } else if (name == "block") {
      setFilterData({ ...filterData, [name]: e,  panchayat: "", village: "", municipal: "", ward: "" })

    } else if (name == "panchayat") {
      setFilterData({ ...filterData, [name]: e, village: "", municipal: "", ward: "" });

    } else if (name == "village") {
      setFilterData({ ...filterData, [name]: e, municipal: "", ward: "" });
    }
    else if (name == "toDate") {
      setFilterData({ ...filterData, [name]: e.target.value });
    }
     else if (name == "fromDate") {
      setFilterData({ ...filterData, [name]: e.target.value });
    }
  }

  useEffect(() => {
    onChange(filterData);

  }, [filterData])
  useEffect(() => {
    dispatch(onDistrict())

  }, [filterData?.area])
  useEffect(() => {
    if (filterData?.district?.value) {
      dispatch(onMunicipalityList(filterData?.district?.value));
      dispatch(onBlockList(filterData?.district?.value));

    }

  }, [filterData?.district])
  useEffect(() => {
    if (filterData?.municipal?.value) {

      dispatch(onWardList(filterData?.municipal?.value));
    }

  }, [filterData?.municipal])
  useEffect(() => {
    if (filterData?.block?.value) dispatch(onPanchayatList(filterData?.block?.value));

  }, [filterData?.block])
  useEffect(() => {
    if (filterData?.panchayat?.value) dispatch(onVillageList(filterData?.panchayat?.value));

  }, [filterData?.panchayat])

  //Disable enable Dropdown
  const [selectDisabledDistrict, setSelectDisabledDistrict] = useState(false);
  const [selectDisabledMunicipality, setSelectDisabledMunicipality] =
    useState(false);
  const [selectDisabledWard, setSelectDisabledWard] = useState(false);
  const [selectDisabledVillage, setSelectDisableVillage] = useState(false);

  const dispatch = useDispatch();

  const district_reducer = useSelector((state) => state.district_reducer?.data);
  const municipality_reducer = useSelector(
    (state) => state.municipality_reducer?.data
  );
  const block_reducer = useSelector(
    (state) => state.block_reducer?.data
  );
  const ward_reducer = useSelector((state) => state.ward_reducer?.data);
  const panchayat_reducer = useSelector((state) => state.panchayat_reducer?.data);
  const village_reducer = useSelector((state) => state.village_reducer?.data);

  /**
   * Getting the District List
   *
   */
  useEffect(() => {
    let district_list = [];

    if (district_reducer ) {
      // const { data, status, message } = district_reducer.data || {};

      if (district_reducer) {
        district_list.push({
          label: "-- Please Select -- ",
          value: null,
          code: null,
        });

        for (let i = 0; i < district_reducer.length; i++) {
          let object = {
            label: district_reducer[i].districtName + " (" + district_reducer[i].lgdCode + ")",
            value: district_reducer[i].lgdCode,
            code: district_reducer[i].lgdCode,
          };
          district_list.push(object);

          setDistrictList(district_list);
        }
      }
    }
  }, [district_reducer]);

  /**
   * Getting the Municipality List and Ward List Use Effect
   */
  useEffect(() => {
    let block_list = [];

    if (block_reducer) {
      // const { data, status, message } = block_reducer.data || {};

      if (block_reducer) {
        block_list.push({
          label: "-- Please Select -- ",
          value: null,
        });
        for (let i = 0; i < block_reducer.length; i++) {
          let object = {
            label: block_reducer[i].blockName + " (" + block_reducer[i].lgdCode + ")",
            value: block_reducer[i].lgdCode,
          };
          block_list.push(object);


        }
        setBlockList(block_list);
      }
    }
  }, [block_reducer]);
  useEffect(() => {
    let municipal_list = [];

    if (municipality_reducer) {
      // const { data, status, message } = municipality_reducer.data || {};

      if (municipality_reducer) {
        municipal_list.push({
          label: "-- Please Select -- ",
          value: null,
        });
        for (let i = 0; i < municipality_reducer.length; i++) {
          let object = {
            label: municipality_reducer[i].name + " (" + municipality_reducer[i].lgdCode + ")",
            value: municipality_reducer[i].lgdCode,
          };
          municipal_list.push(object);


        }
        setMunicipalityList(municipal_list);
      }
    }
  }, [municipality_reducer]);

  useEffect(() => {
    let ward_list = [];

    if (ward_reducer) {
      // const { data, status, message } = ward_reducer.data || {};
      if (ward_reducer) {
        ward_list.push({
          label: "-- Please Select -- ",
          value: null,
          id: null,
        });

        for (let i = 0; i < ward_reducer.length; i++) {
          let object = {
            label: ward_reducer[i].wardName + " (" + ward_reducer[i].lgdCode + ")",
            value: ward_reducer[i].lgdCode,
            id: ward_reducer[i].lgdCode,
          };
          ward_list.push(object);
          // if (ulbData.wardNo === data[i].wardNo) {
          //   setward(object);
          //   setwardId(object);
          // }
        }
        setWardList(ward_list);
      }
    }
  }, [ward_reducer]);
  useEffect(() => {
    let panchayat_list = [];

    if (panchayat_reducer) {
      // const { data, status, message } = panchayat_reducer.data || {};
      if (panchayat_reducer) {
        panchayat_list.push({
          label: "-- Please Select -- ",
          value: null,
          id: null,
        });

        for (let i = 0; i < panchayat_reducer.length; i++) {
          let object = {
            label: panchayat_reducer[i].panchayatName + " (" + panchayat_reducer[i].lgdCode + ")",
            value: panchayat_reducer[i].lgdCode,
            id: panchayat_reducer[i].lgdCode,
          };
          panchayat_list.push(object);
          // if (ulbData.wardNo === data[i].wardNo) {
          //   setward(object);
          //   setwardId(object);
          // }
        }
        setPanchayatList(panchayat_list);
      }
    }
  }, [panchayat_reducer]);
  useEffect(() => {
    let village_list = [];

    if (village_reducer) {
      // const { data, status, message } = village_reducer.data || {};
      if (village_reducer) {
        village_list.push({
          label: "-- Please Select -- ",
          value: null,
          id: null,
        });

        for (let i = 0; i < village_reducer.length; i++) {
          let object = {
            label: village_reducer[i].villageName + " (" + village_reducer[i].lgdCode + ")",
            value: village_reducer[i].lgdCode,
            id: village_reducer[i].lgdCode,
          };
          village_list.push(object);
          // if (ulbData.wardNo === data[i].wardNo) {
          //   setward(object);
          //   setwardId(object);
          // }
        }
        setVillageList(village_list);
      }
    }
  }, [village_reducer]);


  const downloadSheet = () => {
    dispatch(downloadData(filterData))
  }


  return (
    <>
      <Grid container spacing={4} style={{ flex: 1, padding: 20 }}>
        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Area{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={filterData?.area || {}}
            options={[
              {
                label: "Rural" ,
                value: "rural",
                code: "rural",
              },
              {
                label: "Urban" ,
                value: "urban",
                code: "urban",
              }
            ]}
            onChange={(e) => handleChangeFilter(e, "area")}
            // isDisabled={selectDisabledDistrict}
          />
        </Grid>
        {(filterData?.area?.value == "urban" || filterData?.area?.value == "rural") &&<Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            District{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={filterData?.district || {}}
            options={districtList}
            onChange={(e) => handleChangeFilter(e, "district")}
            isDisabled={selectDisabledDistrict}
          />
        </Grid>}

        {filterData?.area?.value == "urban" && <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Municipal{" "}
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={filterData?.municipal}
            options={municipalityList}
            onChange={(e) => handleChangeFilter(e, "municipal")}
            isDisabled={selectDisabledMunicipality}
          />
        </Grid>}

        {filterData?.area?.value == "urban" && <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Ward{" "}
          </InputLabel>
          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={filterData?.ward}
            options={wardList}
            onChange={(e) => handleChangeFilter(e, "ward")}
            isDisabled={selectDisabledWard}
          />


        </Grid>}
        {filterData?.area?.value == "rural" && <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Block{" "}
          </InputLabel>
          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={filterData?.block}
            options={blockList}
            onChange={(e) => handleChangeFilter(e, "block")}
            isDisabled={selectDisabledWard}
          />


        </Grid>}
        {filterData?.area?.value == "rural" && <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            panchayat{" "}
          </InputLabel>
          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={filterData?.panchayat || {}}
            options={panchayatList}
            onChange={(e) => handleChangeFilter(e, "panchayat")}
            isDisabled={selectDisabledWard}
          />


        </Grid>}
       {filterData?.area?.value == "rural" && <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            Village
          </InputLabel>

          <Select
            styles={selectStyles}
            closeMenuOnSelect={true}
            value={filterData?.village || {}}
            options={villageList}
            onChange={(e) => handleChangeFilter(e, "village")}
            isDisabled={selectDisabledVillage}
          />
        </Grid>}
        {/* {router?.pathname == "/survey_summary" &&<>  <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            From Date
          </InputLabel>
          <DatePickerNew
            title=""
            type="date"
            name="fromDate"
            value={filterData?.fromDate || {}}
            onChange={(e) => handleChangeFilter(e, "fromDate")}
          />
        </Grid>
        <Grid item xs={3}>
          <InputLabel
            style={{ marginBottom: 5 }}
            id="demo-simple-select-helper-label"
          >
            To Date
          </InputLabel>
          <DatePickerNew
            title=""
            type="date"
            name="toDate"
            value={filterData?.toDate || {}}
            onChange={(e) => handleChangeFilter(e, "toDate")}
          />
        </Grid>
        <Grid item xs={3} mt={2}>
          <Button variant="contained" onClick={downloadSheet}>Download</Button>
          </Grid></>} */}
      </Grid>
    </>
  );
}
