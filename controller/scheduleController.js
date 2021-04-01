const {
    addedNewSchedule,
    updateSchedule,
    deleteSchedule,
    fetchAllSchedule,
    fetchAllScheduleLogs
  } = require("../services/schedule/scheduleService")
    
module.exports = {    
  
    addedNewSchedule: async(req,res) => {
      try {
        ReS(res,await addedNewSchedule(req),200)
      } catch (error) {
        ReE(res, error, 400, "scheduleController Controller >>> addedNewSchedule method");
      }
    },
    updateSchedule: async(req,res) => {
      try {
        ReS(res,await updateSchedule(req),200)
      } catch (error) {
        ReE(res, error, 400, "scheduleController Controller >>> updateSchedule method");
      }
    },
    deleteSchedule: async(req,res) => {
      try {
        ReS(res,await deleteSchedule(req),200)
      } catch (error) {
        ReE(res, error, 400, "scheduleController Controller >>> deleteSchedule method");
      }
    },
    fetchAllSchedule: async(req,res) => {
      try {
        ReS(res,await fetchAllSchedule(req),200)
      } catch (error) {
        ReE(res, error, 400, "scheduleController Controller >>> fetchAllSchedule method");
      }
    },
    fetchAllScheduleLogs: async(req,res) => {
      try {
        ReS(res,await fetchAllScheduleLogs(req),200)
      } catch (error) {
        ReE(res, error, 400, "scheduleController Controller >>> fetchAllScheduleLogs method");
      }
    }
}