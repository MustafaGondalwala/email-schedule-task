const express = require("express");
const router = express.Router();
const {addedNewSchedule,updateSchedule,deleteSchedule,fetchAllSchedule,fetchAllScheduleLogs} = require("../../controller/scheduleController")


router.post('/email-schedule/logs/fetchAll',fetchAllScheduleLogs)


router.post('/email-schedule/fetchAll',fetchAllSchedule)
router.post('/email-schedule/create',addedNewSchedule)
router.put('/email-schedule/update',updateSchedule)
router.delete('/email-schedule/:schedule_id',deleteSchedule)



module.exports = router
