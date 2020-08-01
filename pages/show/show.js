Page({
 
  fetchRestaurant: function (id) {
   
    let restaurant = new wx.BaaS.TableObject("restaurant")

    restaurant.get(id).then(res => {
      let restaurant = res.data
      this.setData({restaurant})
    })
  },

  fetchRestaurantMeals: function (id) {
    let Meals = new wx.BaaS.TableObject('meal');
    let query = new wx.BaaS.Query();
    query.compare('restaurant_id', '=', id);
    Meals.setQuery(query).find().then(res => {
      let meals = res.data.objects;
      this.setData({meals});
    })
  },
  submitOrder: function (e) {
    console.log(e)
    let meal_id = e.currentTarget.dataset.id;
    let Order = new wx.BaaS.TableObject('order');
    let user = wx.BaaS.auth.getCurrentUser()
    let data = {meal_id, user_id: user.id};
    let MyRecord = Order.create()
    MyRecord.set(data).save().then(res => {
      console.log(res)
      wx.reLaunch({
        url: '../user/user',
      })
    });

  },

  

  onLoad: function (options) {
    let id = options.id;
    this.fetchRestaurant(id);
    this.fetchRestaurantMeals(id);
  }
  
})