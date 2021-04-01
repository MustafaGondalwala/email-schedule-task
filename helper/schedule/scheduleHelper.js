const Schedule = require('../../models/schedule')
const ScheduleLog = require('../../models/scheduleLog')

module.exports = {    
    saveSchedule: async(data,_id) => _id != null ? await Schedule.findByIdAndUpdate(_id,data, {new: true}) : await Schedule.create(data),
    getTotalSchedule: async(query) => await Schedule.find(query).countDocuments(),
    deleteScheduleFromDB: async(_id) => await Schedule.findByIdAndDelete(_id),
    getScheduleData: async(query,skip,limit) => await Schedule.find(query).sort('-updatedAt').skip(skip).limit(limit),
    addMailResponse: async(data) => await ScheduleLog.create(data),
    getScheduleLogData: async(query,skip,limit) => await ScheduleLog.find(query).populate('scheduleId').sort('-updatedAt').skip(skip).limit(limit),
    getTotalScheduleLog: async(query) => await ScheduleLog.find(query).countDocuments(),
}