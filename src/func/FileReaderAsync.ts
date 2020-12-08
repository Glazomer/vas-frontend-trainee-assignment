export default function (blob: Blob): Promise<string> {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () =>
      resolve(
        typeof reader.result === 'string'
          ? reader.result
          : new TextDecoder('utf-8').decode(reader.result)
      );
    reader.onerror = (error) => reject(error);
  });
}
