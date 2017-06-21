const Models = require('../app/models');


function savelabel(labelInst, callback) {
   const labelObj = new Models.Label({
    title: labelInst.title,
    color: labelInst.color,
  });
    labelObj.save(function (errInSave, saveLabel) {
    if (errInSave) {
      callback({
        type: 'DB_ERROR',
        msg: 'Failed to Create a new Label.',
        errorDetail: String(errInSave),
      });
      return errInSave;
    }
    callback(null, saveLabel);
  });
}

function fetchlabel(callback) {
  Models.Label
    .find({})
    .lean()
    .exec(function (fetchError, labels) {
      if (fetchError) {
        waterfallCallback({
          type: 'DB_ERROR',
          msg: 'All todo Fetch Error',
          errorDetails: String(fetchError),
        });
        return;
      }
      callback(null, labels);
    });
}



module.exports = {
  savelabel: savelabel,
  fetchlabel: fetchlabel,
};
