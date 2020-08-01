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
    let meal_id = e.currentTarget.dataset.id;
    let points = e.currentTarget.dataset.points
    wx.BaaS.auth.getCurrentUser().then(user => {
      let user_points = user.get('points')
      if (points > 0 || user_points > points) {
        let data = {meal_id, user_id: user.id, points};
        let Order = new wx.BaaS.TableObject('order');
        
        let MyRecord = Order.create()

        MyRecord.set(data).save().then(res => {
          let order = res.data;
          this.updatePoints(user, order);
          
          wx.reLaunch({
            url: '../user/user',
          })
        });
      } else {
        wx.showModal({
          title: 'Get the hell outta here u cheap font!',
        })
      }
    }); 
  },

  updatePoints: function (user, order) {
    // add points from new order to user's total points
    // 1.Fetch user points
    let points = user.get("points");
    // 2.Fetch order points
    // 3.Add user points and order points together
    points = points + order.points;
    // 4.Update user entry with new points
    user.set("points", points).update();

  },

  onLoad: function (options) {
    let id = options.id;
    this.fetchRestaurant(id);
    this.fetchRestaurantMeals(id);
  }
  
})