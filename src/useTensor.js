import { useState, useEffect } from "react";

const useTensor = (file, e) => {
  useEffect(() => {
    doOCR();
  }, [file]);

  return { passage, loading: loading };
};

export default useTensor;
