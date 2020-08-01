Page({
  data:{

  },

  fetchDataFromBaas: function(){
    let query = new wx.BaaS.Query()
    let Restaurants = new wx.BaaS.TableObject("restaurant")
    Restaurants.setQuery(query).find().then(res => {
      let restaurant = res.data.objects;
      this.setData({restaurant});

    })

  },
  navigateToShow: function(e) {
    let id = e.currentTarget.dataset.id; 
    wx.navigateTo({
      url: `../show/show?id=${id}`,
    })

  },

  onLoad: function () {
    this.fetchDataFromBaas()

  },


})