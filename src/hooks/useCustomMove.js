import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }

  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  const [queryParams] = useSearchParams();

  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  const category = getNum(queryParams.get("category"), 1);

  const queryDefault = createSearchParams({ page, size, category }).toString(); //새로 추가

  const moveToList = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
        category,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({
      pathname: `../list`,
      search: queryStr,
    });

    setRefresh(!refresh); //추가
  };
  return { moveToList }; //refresh 추가
};

export default useCustomMove;
