export const findHRAdmins = data => {
  const targets = data.HR.filter(x => x.occupation === 'HR Administrator').map(y => y.name);
  return targets;
};


export const findSalariesOver70k = data => {
  const targets = data.Sales.filter(x => x.salary > 70000).map(y => `${y.name} $${y.salary}`);
  return targets;
};


export const findHighestITSalary = data => {
  const highest = {
    name: '',
    salary: 0
  };

  data.IT.forEach(x => {
    if (x.salary > highest.salary) {
      highest.name = x.name;
      highest.salary = x.salary
    }
  });

  return `${highest.name} $${highest.salary}`;
};


export const findAverageHRSalary = data => {
  let salaries = [];
  data.HR.forEach(x => {
    salaries.push(x.salary);
  });
  return `$${(salaries.reduce((a,b) => a + b, 0) / salaries.length).toFixed(2)}`;
};