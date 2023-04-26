const getFileExtension = (url: string) => {
  const splittedUrl = url.split('.');
  const fileExtension = splittedUrl[splittedUrl.length - 1];
  return fileExtension;
};

export { getFileExtension };
