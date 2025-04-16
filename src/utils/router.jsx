import {
    createBrowserRouter,
} from "react-router-dom";
import JobForm from "../page/components/jobform";
import JobList from "../page/components/joblist";




const router=createBrowserRouter(
    [
        {
            path:"/",
            element:<JobList/>,
        },
        {
            path:"/jobs/new",
            element:<JobForm/>,
        },
    ],
)
export { router}