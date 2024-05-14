import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "auto auto",
  borderWidth: '7px',
  paddingTop: '35px',
};

const ProductLoader = () => (
  <ClipLoader
    color="rgb(147 200 211)"
    cssOverride={ override }
    size={ 80 }
    aria-label="Loading Spinner"
    data-testid="loader"
  />
)

export default ProductLoader;

