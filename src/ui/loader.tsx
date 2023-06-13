import "./style/loader.css"
import { loaderSlice } from './../redux/loaderSlice';

export const Loader = () => (
    <div className="loader-backdrop">
    <div className="loader-spinner"></div>
  </div>
)