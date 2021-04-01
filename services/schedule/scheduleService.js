const {
    saveSchedule,
    getTotalSchedule,
    deleteScheduleFromDB,
    getScheduleData,
    getScheduleLogData,
    getTotalScheduleLog,
} = require("../../helper/schedule/scheduleHelper")


module.exports = (function () {
    this.addedNewSchedule = async ({body}) => {
        const {from,to,subject,message,sceduledAt} = body
        if(!from || !to || !subject  || !message || !sceduledAt){
            TE("Invalid Parameter: from,to,subject,subject,message is required")
        }
        const data = {
            from,to,subject,message,sceduledAt:new Date(sceduledAt*1000)
        }

        // save data and send to response
        return {
            data:{
                newSchedule:await saveSchedule(data),
                total:await getTotalSchedule()
            }
        }
    }
    this.updateSchedule = async ({body}) => {
        const {scedule_id} = body
        const {from,to,subject,message,sceduledAt} = body


        // get the data from db
        let query = {
            _id:scedule_id
        }
        
        // check is already exist
        if(await getTotalSchedule(query) == 0){
            TE("Cannot Find Schedule")
        }

        const data = {}
        
        if(!from) data.from = from
        if(!to) data.to = to
        if(!subject) data.subject = subject
        if(!message) data.message = message
        if(!sceduledAt) data.sceduledAt = sceduledAt

        return {
            data:{
                updatedSchedule:await saveSchedule(data,scedule_id),
                total:await getTotalSchedule()
            }
        }
    }
    this.deleteSchedule = async ({params}) => {
        const {schedule_id} = params
        if(await getTotalSchedule({_id:schedule_id})  == 0){
            TE("Cannot Find Schedule")
        }
        return {
            data:{
                deletedEnquiry:await deleteScheduleFromDB(schedule_id),
                total:await getTotalSchedule()
            }
        }
    }
    this.fetchAllSchedule = async ({body}) => {
           // santilize the skip and limit
           const {skip,limit} = getSkipLimitFromBody(body)

           // define the filter values
           const filterValues = [
               "from","to","name","schedule_id"
           ]
   
           // santize the filter values
           const {from,to,schedule_id} = getFilterValues(filterValues,body)
   
           // make query
           let query = {}
   
           if( schedule_id != null ) query._id = schedule_id
           if( from != null ) query.from = new RegExp(from,'i')
           if( to != null ) query.to = new RegExp(to,'i')
   
           // get the data
           const all_data = await getScheduleData(query,skip,limit)
   
           return {
               data:{
                   all_data,
                   totalPage:all_data.length,
                   total:await getTotalSchedule(query),
                   totalCount:await getTotalSchedule(),
                   pagination:{
                       skip,
                       limit
                   },
                   filter:{
                    from,to,schedule_id
                   }
               }
           }
    }
    this.cronSchedulePerMinute = async() => {
        const current_time = new Date()
        current_time.setSeconds(0)
        const last_time = new Date()
        last_time.setSeconds(60)

        const query = {}
        query.sceduledAt = {
            $gte: current_time, 
            $lt: last_time
        }
        
        const all_schedules = await getScheduleData(query,0,1000)
        all_schedules.map(async item => {
            await sendMail(item)
        })
    }
    this.fetchAllScheduleLogs = async ({body}) => {
        const filterValues = [
            "from","to","status","scheduleLog_id"
        ]
        const {from,to,status,scheduleLog_id} = getFilterValues(filterValues,body)
        const {skip,limit} = getSkipLimitFromBody(body)

        const query = {}

        if(from != null && to != null ) {
            query.updatedAt = {
                $gte: from, 
                $lt: to
            }
        }
        if(status != null && (status == true || status == false)){
            query.status = status
        }
        
        if(scheduleLog_id != null) query._id = scheduleLog_id
        
        const all_data = await getScheduleLogData(query,skip,limit)
        return {
            data:{
                all_data,
                totalPage:all_data.length,
                total: await getTotalScheduleLog(query),
                totalCount:await getTotalScheduleLog(),
                pagination:{
                    skip,limit
                },
                filter:{
                    from,to,status,scheduleLog_id
                }
            }
        }
    } 
    return this;
  })();