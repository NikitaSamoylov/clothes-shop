import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "auto auto",
  borderWidth: '7px',
};

const ProductLoader = () => (
  <ClipLoader
    color="rgb(97 195 228)"
    cssOverride={ override }
    size={ 80 }
    aria-label="Loading Spinner"
    data-testid="loader"
  />
)

export default ProductLoader;

