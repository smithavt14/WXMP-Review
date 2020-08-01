App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)

    let clientID = '5944e9f9c20e60de5c5e'  // 应用名称: Le Wagon Talents
    wx.BaaS.init(clientID)
    wx.BaaS.auth.loginWithWechat()
  }
})