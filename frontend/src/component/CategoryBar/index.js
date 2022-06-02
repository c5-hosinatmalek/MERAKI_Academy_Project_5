import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getcatogre } from "../../redux/reducers/catogre"



const CategoryBar =()=>{
    const dispatch =useDispatch()
    const state =useSelector((state)=>{

        return {
            category:state.catogre.catorge
        }
    })

    axios.get("http://localhost:5000/category").then((result)=>{

dispatch(getcatogre(result.data.result))
    }).catch((err)=>{
        console.log(err);
    })
    return <div>
        {state.category&&state.category.map((element,index)=>{
            return <Link to={`/category/${element.id}/products`}>{element.category}</Link>
        })}
    </div>
}


export {CategoryBar}