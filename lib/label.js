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

function fetchSinglelabel(labelIdObj, callback) {
  Models.Label
    .findOne(labelIdObj)
    .lean()
    .exec(function (fetchError, labels) {
      if (fetchError) {
        waterfallCallback({
          type: 'DB_ERROR',
          msg: 'All label Fetch Error',
          errorDetails: String(fetchError),
        });
        return;
      }
      callback(null, labels);
    });
}

 function updateLabel(updateObj, callback) {
   Models.Label.update({_id:updateObj._id},{$set:{title:updateObj.title,color:updateObj.color}},function (fetchError, updatelabels) {
      if (fetchError) {
        waterfallCallback({
          type: 'DB_ERROR',
          msg: 'All  updatelabels Error',
          errorDetails: String(fetchError),
        });
        return;
      }
      callback(null, updatelabels);
    });
 }


module.exports = {
  savelabel: savelabel,
  fetchlabel: fetchlabel,
  fetchSinglelabel: fetchSinglelabel,
  updateLabel:updateLabel,
};
