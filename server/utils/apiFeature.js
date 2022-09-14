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
      const keyword = this.queryStr.keyword
        ? { name: { $regex: this.queryStr.keyword, $options: "i" } }
        : {};

      // updating query with only the product that matches
      this.query = this.query.find({ ...keyword });

      // return the whole function to be accessible
      return this;
    }

    // filter method for catagories
    filter(){
      const copyQuery = { ...this.queryStr };

      // removing feilds for category
      const removeFeilds = ["keyword", "page", "limit"];

      // feilds removing
      removeFeilds.forEach((key) => delete copyQuery[key]);

      // filter for price and ratings

      // change the copyQuery object into string
      let queryStr = JSON.stringify(copyQuery);

      // replace query with a $ in front of them to mongodb executable
      queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g, (key) => `$${key}`);

      // updating the query
      // change the queryStr to object
      this.query = this.query.find(JSON.parse(queryStr));

      // return the whole function to be accessible
      return this;
    }

    // defines the product displayed on a page
    pagination(resultperpage){
        // it takes the query 'page=..' from the api 
        const currentpage = Number(this.queryStr.page) || 1;

        // counts the no. of products to be skipped counting from 1st 
        const skip = resultperpage * (currentpage - 1);

        // skipping those products according to page
        this.query = this.query.limit(resultperpage).skip(skip);

        // return the whole function to be accessible 
        return this;
    }
}

export default ApiFeature;