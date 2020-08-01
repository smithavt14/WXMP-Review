Page({
  fetchOrders: function () {
    let query = new wx.BaaS.Query();
    let user_id = this.data.user.id;
    let Order = new wx.BaaS.TableObject("order");
    query.compare("user_id","=", user_id);
    Order.setQuery(query).expand(['meal_id']).find().then(res => {
      console.log(res)
      let order = res.data.objects
      this.setData({order})
    })
  },

    delete: function (e) {
      console.log (e)
      let id = e.currentTarget.dataset.id
      let Order = new wx.BaaS.TableObject("order")
      Order.delete(id).then(res => {
        console.log(res)
        this.fetchOrders()
      })

    },

  checkUser: function () {
    wx.BaaS.auth.getCurrentUser().then(user => {
      this.setData({user});
      this.fetchOrders()
    })
  },
  onLoad: function () {
    this.checkUser()
  }
  
})