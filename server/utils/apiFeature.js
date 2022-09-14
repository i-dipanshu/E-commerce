class ApiFeature{
    // query --> Product.find()
    // queryStr --> query from url
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    // search for the queryStr from url in the query
    search(){
        // resolving queryStr for all suitable searches 
        const keyword = this.queryStr.keyword ? {name : {$regex: this.queryStr.keyword, $options: "i"}} : {};
        // updating query with only the product that matches
        this.query = this.query.find({...keyword});
        return this;
    }

    // filter method for catagories
    filter(){
        const copyQuery = { ...this.queryStr };
        // removing feilds for category
        const removeFeilds = ["keyword", "page", "limit"];
        // feilds removing
        removeFeilds.forEach((key) => delete copyQuery[key]);
        // updating the query 
        this.query = this.query.find(copyQuery);
        return this;

    }
}

export default ApiFeature;