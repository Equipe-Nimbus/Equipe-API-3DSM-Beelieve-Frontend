export const isValidCPF = (cpf) => {
    const cleanCPF = cpf.replace(/[\.-]/g, '');
  
    if (cleanCPF.length !== 11) {
      return false;
    }
  
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return false;
    }
  
    let sum = 0;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.charAt(i - 1)) * (11 - i);
    }
    let remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
  
    if (remainder !== parseInt(cleanCPF.charAt(9))) {
      return false;
    }
  
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
  
    if (remainder !== parseInt(cleanCPF.charAt(10))) {
      return false;
    }
  
    return true;
  };