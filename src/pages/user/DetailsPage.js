import { Button, CardMedia, Typography } from "@mui/material";
import { API_SERVER_HOST } from "../../resources/BasicResources";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";

const DetailsPage = () => {
  const { loginState } = useCustomLogin();

  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const tempInputValue = e.target.value;
  //   setInputValue({ ...inputValue, [e.target.name]: tempInputValue });
  // };

  const handleClickMyProducts = (string) => {
    if (string === "list") {
      navigate(`/products/${loginState.username}`);
    } else if (string === "register") {
      navigate(`/products/register`);
    }
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <CardMedia
        component='img'
        image={`${API_SERVER_HOST}/api/products/view/${loginState.profileImage}`}
        sx={{
          minWidth: "400px",
          maxWidth: "25%",
          maxHeight: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
        }}
      >
        <Typography color='secondary' fontSize='4rem'>
          이름 : {loginState.username}
        </Typography>
        <Typography color='secondary' fontSize='4rem'>
          닉네임 : {loginState.nickname}
        </Typography>
        <Typography color='secondary' fontSize='4rem'>
          email : {loginState.email}
        </Typography>

        <div
          style={{
            display: "flex",
            width: "75%",
            justifyContent: "space-around",
            margin: "auto",
          }}
        >
          <Button
            color='secondary'
            variant='contained'
            onClick={() => handleClickMyProducts("register")}
            sx={{
              width: "40%",
              marginRight: "auto",
            }}
          >
            <Typography color='main'>등록</Typography>
          </Button>
          <Button
            color='secondary'
            variant='contained'
            onClick={() => handleClickMyProducts("list")}
            sx={{
              width: "40%",
              marginLeft: "auto",
            }}
          >
            <Typography color='main'>내상품</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
