// const moment = require('moment')

// dust.helpers.roadmapDates = function(chunk, context, bodies, params) {
//   if (params.data) {
//     const ds = context.resolve(params.data)

//     if (ds.results && ds.results[0]) {
//       const startDate = moment(ds.results[0].date);
//       const endDate = moment(ds.results[ds.results.length-1].date);

//       let result = [];

//       if (endDate.isBefore(startDate)) {
//         throw "End date must be greated than start date."
//       }   

//       const currentDate = startDate.clone();

//       while (startDate.isBefore(endDate)) {
//         result.push(currentDate.format("YYYY-MM-01"));
//         startDate.add(1, 'month');
//       }
//     }
//   }
//   return chunk
// }