const { ObjectID } = require('mongodb');

const mongoclient=require('mongodb').MongoClient;
const objectid=require('mongodb').ObjectID;
const dbname='crud-mongodb';
const url='mongodb://localhost:27017';
const mongooptions={useUnifiedTopology:true};


const state={
    db:null
};
const connect=(cb)=>{
    if(state.db){
        cb();
    }else{
        mongoclient.connect(url,mongooptions,(err,client)=>{
            if(err){
                cb(err);
            }else{
                state.db=client.db(dbname);
                cb();
            }
        });
    }
}

const getprimarykey=(_id)=>{
    return ObjectID(_id);
}
const getdb=()=>{
    return state.db;
}
module.exports={getdb,connect,getprimarykey};