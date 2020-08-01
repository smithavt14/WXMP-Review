Page({
  fetchOrders: function () {
    let query = new wx.BaaS.Query();
    let user_id = this.data.user.id;

    let Order = new wx.BaaS.TableObject("order");
    
    query.compare("user_id", "=", user_id);
    
    Order.setQuery(query).expand(['meal_id']).find().then(res => {
      let orders = res.data.objects
      this.setData({orders})
    })
  },

  delete: function (e) {
    let id = e.currentTarget.dataset.id
    let Order = new wx.BaaS.TableObject("order")
    Order.delete(id).then(res => {
      this.fetchOrders()
    })
  },

  checkUser: function () {
    wx.BaaS.auth.getCurrentUser().then(user => {
      user = user.toJSON();
      this.setData({user});

      this.fetchOrders();
      
    })
  },
  onLoad: function () {
    this.checkUser();
  }
})