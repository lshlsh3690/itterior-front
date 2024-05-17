import React from "react";
import ProductSortComponent from "../../components/products/ProductSortComponent";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getListWithUsername } from "../../api/ProductApi";
import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { API_SERVER_HOST } from "../../resources/BasicResources";
import useCustomLogin from "../../hooks/useCustomLogin";

const host = `${API_SERVER_HOST}/api/products`;

const UserProductList = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "10";

  const navigate = useNavigate();

  const { loginState } = useCustomLogin();
  const username = loginState.username;
  const { data } = useQuery({
    // queryKey: ["products/list", { page, size, refresh }],
    queryKey: ["products/:username", { page, size, username }],
    queryFn: () => getListWithUsername({ page, size, username }),
    fetchData: () => data,
    staleTime: 1000 * 60,
  });

  const moveProductDetails = (product) => {
    navigate(`../productions/${product.pno}`);
  };

  const fetchData = data;
  return (
    <div>
      <ProductSortComponent />
      <List>
        {fetchData &&
          fetchData.dtoList.map((product) => (
            <ListItem key={product.pno} onClick={() => moveProductDetails(product)}>
              <Card sx={{ display: "flex", width: "100%", height: "150px" }}>
                <CardMedia
                  component='img'
                  image={`${host}/view/s_${product.uploadFileNames[0]}`}
                  alt={product.pdesc}
                  sx={{ width: "200px" }}
                />
                <CardContent sx={{ width: "20vw" }}>
                  <Typography variant='h5' component='div'>
                    {product.pname}
                  </Typography>
                </CardContent>
                <CardContent sx={{ width: "30vw" }}>
                  <Typography variant='body2' color='text.secondary'>
                    {product.pdesc}
                  </Typography>
                </CardContent>
                <CardContent sx={{ width: "10vw" }}>
                  <Typography>{product.price}</Typography>
                </CardContent>
                <CardContent sx={{ width: "10vw" }}>
                  <Typography>{product.seller || "판매자"}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default UserProductList;
