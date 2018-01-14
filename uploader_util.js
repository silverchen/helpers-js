//import Upload from 'react-native-background-upload'
// import FileUploader from 'react-native-file-uploader'
import RNFetchBlob from 'react-native-fetch-blob';

module.exports = {
  upload: function (filePath, fieldName, url, onSuccess, onError, params) {
    if (!params) {
      params = [];
    }

    if (filePath.includes('file://')) {
      filePath = filePath.split('file://').pop();
    }

    var fileExtension = filePath.split('.').pop().toLowerCase().trim();
    var fileName;
    var fileType;

    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
      fileName = 'file.jpg';
      fileType = 'image/jpeg';
    } else if (fileExtension === 'png') {
      fileName = 'file.png';
      fileType = 'image/png';
    } else if (fileExtension === 'pdf') {
      fileName = 'file.pdf';
      fileType = 'application/pdf';
    } else if (fileExtension === 'doc') {
      fileName = 'file.doc';
      fileType = 'application/msword';
    } else if (fileExtension === 'docx') {
      fileName = 'file.doc';
      fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else {
      fileName = 'file.pdf';
      fileType = 'application/pdf';
    }

    RNFetchBlob.fetch('POST', url, {
      'Content-Type' : 'multipart/form-data',
    }, [
      { name: fieldName, filename: fileName, type:fileType, data:RNFetchBlob.wrap(decodeURI(filePath)) },
      ...params
    ]).then((res) => {
      onSuccess(res);
    }).catch((err) => {
      onError(err);
    });

    // RNFetchBlob.fetch(
    //   'POST',
    //   url,
    //   {
    //     // Authorization : "Bearer " + token,
    //     'Content-Type' : 'multipart/form-data'
    //   },
    //   {
    //     'avatar': base64String
    //   }
    // )
    // .then((res) => {
    //   onSuccess(res);
    // })
    // .catch((err) => {
    //   onError(err);
    // });

    // var settings = {
    //   fileUrl,
    //   url
    // };
    //
    // FileUploader.upload(settings, (err, res) => {
    //   // handle result
    //   if (err) {
    //     if (onError) {
    //       onError(err);
    //     }
    //   } else if (res) {
    //     if (onSuccess) {
    //       onSuccess(res);
    //     }
    //   }
    // }, (sent, expectedToSend) => {
    //   // handle progress
    //   if (onProgres) {
    //     onProgres(sent);
    //   }
    // });

    // const options = {
    //   url: url,
    //   path: fileUrl,
    //   method: 'POST'
    // }
    //
    // Upload.startUpload(options).then((uploadId) => {
    //   console.log('Upload started')
    //   Upload.addListener('progress', uploadId, (data) => {
    //     if (onProgres) {
    //       onProgres(data.progress);
    //     }
    //     console.log(`Progress: ${data.progress}%`)
    //   })
    //   Upload.addListener('error', uploadId, (data) => {
    //     if (onError) {
    //       onError(data.error);
    //     }
    //     console.log(`Error: ${data.error}%`)
    //   })
    //   Upload.addListener('completed', uploadId, (data) => {
    //     if (onSuccess) {
    //       onSuccess(data);
    //     }
    //     console.log(`Completed!`)
    //   })
    // }).catch(function(err) {
    //   if (onError) {
    //     onError(err);
    //   }
    //   console.log('Upload error!',err)
    // });
  }
};
