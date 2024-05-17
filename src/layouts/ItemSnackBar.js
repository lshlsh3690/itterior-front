import Button from "@mui/material/Button";
import { Box, Snackbar } from "@mui/material";

const ItemSnackBar = ({
  message,
  dateSortOrder,
  priceSortOrder,
  sortBy,
  setSortBy,
  nextSortBy,
  setDateSortOrder,
  setPriceSortOrder,
  open,
  setOpen,
}) => {
  const handleClick = () => {
    setOpen(true);

    console.log("handlechange");
    console.log(sortBy);
    if (sortBy === "date") {
      if (nextSortBy === "date") {
        setDateSortOrder(dateSortOrder === "asc" ? "desc" : "asc");
      }
    } else if (sortBy === "price") {
      if (nextSortBy === "price") {
        setPriceSortOrder(priceSortOrder === "asc" ? "desc" : "asc");
      }
    }
    setSortBy(nextSortBy);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Box>
      <Button
        sx={{
          bgcolor: "black",
          whiteSpace: "nowrap", // 텍스트가 화면을 넘어가지 않고 줄 바꿈되지 않도록 설정
        }}
        onClick={() => handleClick()}
      >
        {message}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message={message}
      />
    </Box>
  );
};

export default ItemSnackBar;
