import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getUserDocument } from "../firebase";

export default function Home() {

    const [data, setData] = useState(null);

    useEffect(async () => {
        try {
            const res = await getUserDocument("sala");
            if (!res) throw "No connection"
            setData(res?.sale['SAGRA']);
        } catch (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                draggable: true,
            });
        }
    }, [])

    let temp = null;

    if (data != null) {

        const result = Object.entries(data).reduce((abb,pixel) => {

            const [key,value] = pixel

            if (value.prenotazioni?.length > 0) {

                temp = value.prenotazioni.reduce((acc , prenotazioni) => {
                    
                return prenotazioni.type === "default" && prenotazioni.user === "3495141095" ? {...acc,[key]:prenotazioni} : {...acc}

                },{})}
            return  [...abb,temp] 

    },[])

    console.log(result.filter(data=>{
       if (data!= null)console.log(data.type)
        return data != null && data != {}
    }))


    
    
}

return (
    <div>
        <ToastContainer
            position="top-right"
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            draggable
            hideProgressBar
        />
    </div>
);


}
