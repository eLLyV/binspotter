import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';

const fetchBins = async ({queryKey}) => {

    const apiRes = await getDocs(collection(db, "bins"));
                            
    if(!apiRes) {
        throw new Error(`bins fetch not ok`);
    }

    return apiRes.docs;

}

export default fetchBins;