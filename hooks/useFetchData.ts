import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, CollectionReference, onSnapshot, query, QueryConstraint } from 'firebase/firestore'
import { firestore } from '@/cofig/firebase'
//something related to parent component but what?
const useFetchData =<T> (
    collectionName:string,
    constraints:QueryConstraint[]=[]
) => {
    const[data,setdata]=useState<T[]>([]) 
    const [loading,setloading]=useState(true)
    //it can be of type string or null, error fetching the data
    const[error,seterror]=useState<string|null>(null)

    useEffect(()=>{
        if(!collectionName)return;
        const collectionNameref=collection(firestore,collectionName)
        const q=query(collectionNameref,...constraints)
        const unsub=onSnapshot(q,(snapshot)=>{
            const fetchedData=snapshot.docs.map(doc=>{
                return{
                    id:doc.id,
                    ...doc.data()
                };
            }) as T[]
            setdata(fetchedData);
            setloading(false);
        },(err)=>{//explain this parameter
            console.log("error: ",err);
            seterror(err.message);
            setloading(false);//why did we do thid
        });
        //when is this called? something about unmounting
        return()=>unsub();
    },[]);
     return{data,loading,error};
};

export default useFetchData

const styles = StyleSheet.create({})
