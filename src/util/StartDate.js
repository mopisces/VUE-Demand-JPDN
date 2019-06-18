export default {
	setToday(){
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        return now.getFullYear() + '-' + cmonth + '-' + day
     },
     setStart(){
        var date = new Date()
        var myDate = new Date(date.getTime() + 5*24*60*60*1000)
        var year = myDate.getFullYear()
        var month = myDate.getMonth() + 1
        var day = myDate.getDate()
        let startDate = year + "-"
        if(month >= 10)
        {
          startDate = startDate + month + "-";
        }
        else
        {
          startDate = startDate + "0" + month + "-"
        }
        if(day >= 10)
        {
          startDate = startDate + day
        }
        else
        {
          startDate = startDate + "0" + day
        }
			return startDate
      }
}