import { useNavigate, useSearchParams } from "react-router-dom";
import { getList } from "../../api/ProductApi";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { API_SERVER_HOST } from "../../resources/BasicResources";
import { useQuery } from "@tanstack/react-query";
import useCustomMove from "../../hooks/useCustomMove";
import MyPagination from "../../components/common/MyPagination";
import ProductSortComponent from "../../components/products/ProductSortComponent";
import { useState } from "react";

const host = `${API_SERVER_HOST}/api/products`;

const ListPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const page = searchParams.get("page") || "1";
  const [sortBy, setSortBy] = useState("date"); // 정렬 기준 [date, price]
  const [dateSortOrder, setDateSortOrder] = useState("desc"); // 정렬 순서 [asc, desc]
  const [priceSortOrder, setPriceSortOrder] = useState("desc"); // 정렬 순서 [asc, desc]
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const { moveToList } = useCustomMove();

  const handleClickPage = (pageParam) => {
    moveToList(pageParam);
  };

  const { data, isFetching } = useQuery({
    queryKey: [
      "products/list",
      { page, pageSize, category, sortBy, dateSortOrder, priceSortOrder },
    ],
    queryFn: () =>
      getList({ page, pageSize, category, sortBy, dateSortOrder, priceSortOrder }),
  });

  if (isFetching) {
    return <div>loading...</div>;
  }

  const moveProductDetails = (product) => {
    navigate(`../productions/${product.pno}`);
  };

  return (
    <>
      <ProductSortComponent
        sortBy={sortBy}
        dateSortOrder={dateSortOrder}
        priceSortOrder={priceSortOrder}
        setSortBy={setSortBy}
        setDateSortOrder={setDateSortOrder}
        setPriceSortOrder={setPriceSortOrder}
        open={open}
        setOpen={setOpen}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      <List>
        {data &&
          data.dtoList.map((product) => (
            <ListItem
              sx={{ padding: "1em 0" }}
              key={product.pno}
              onClick={() => moveProductDetails(product)}
            >
              <Card sx={{ display: "flex", minWidth: "100%", height: "150px" }}>
                <CardMedia
                  component='img'
                  // image={`${host}/view/s_${product.uploadFileNames[0]}`}
                  image={`${host}/view/s_${product.uploadFileNames[0]}`}
                  alt={product.pdesc}
                  sx={{ width: "15%" }}
                />
                <Box sx={{ flexDirection: "column", width: "45%" }}>
                  <CardContent>
                    <Typography variant='h5'>{product.pname}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      {product.pdesc}
                    </Typography>
                  </CardContent>
                </Box>

                <CardContent sx={{ width: "20%" }}>
                  <Typography>￦ {product.price}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>{product.seller || "판매자"}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        {(!data || data === undefined || data.dtoList.length === 0) && (
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            상품이 없습니다.
          </Typography>
        )}
      </List>
      {data && (
        <MyPagination
          serverData={data}
          page={data.current}
          movePage={handleClickPage}
        />
      )}
    </>
  );
};

export default ListPage;
