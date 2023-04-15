
    async function addStudent() {
      let values='(\"'+document.getElementById('studentName').value+'\", '+document.getElementById('studentPID').value+',';
      values = values + document.getElementById('studentClassification').value + ')';
      const res = await fetch("http://localhost:8080/insertStudent?ParamVALUES="+values);
    }
  
    
    async function testdatabase() {
      const DBTag = document.querySelector(".testDB");
      const res = await fetch("http://localhost:8080/alldata");
      const data = await res.json();

      for (const myrow of data.data){
        const mainContainer = document.createElement("div");
        mainContainer.className = "user_container";
        let status='undeclared';
        
        if (myrow.classification<2) {
           status= 'Freshman';
         } else if (myrow.classification<3) {
          status='Sophomore';
         } else if (myrow.classification<4) {
          status='Junior';
         } else {
          status='Senior';
         }
        mainContainer.innerHTML = `
          <div>PantherID= ${myrow.pid}&nbsp&nbsp
          Name= ${myrow.name}&nbsp&nbsp
          STATUS=${status}
          </div>
         `;

        DBTag.appendChild(mainContainer);
     }
  }

  async function filterClass(){
    let Pfilter=document.getElementById('studentClass').value ;
    if (Pfilter === "") {
      Pfilter = " WHERE classification IS NOT NULL";
    } else {
      Pfilter = "WHERE classification = "+Pfilter;
    }
    const DBTag_Class = document.querySelector(".filterStudents");
    const res = await fetch("http://localhost:8080/filter?ParamWHERE="+Pfilter);
      const data = await res.json();
      
    
      for (const myrow of data.data){
        const mainContainer = document.createElement("div");
        mainContainer.className = "user_container";
        let status;
        if (myrow.classification<2) {
           status= 'Freshman';
         } else if (myrow.classification<3) {
          status='Sophomore';
         } else if (myrow.classification<4) {
          status='Junior';
         } else {
          status='Senior';
         }
        mainContainer.innerHTML = `
          <div>PantherID= ${myrow.pid}&nbsp&nbsp
          Name= ${myrow.name}&nbsp&nbsp
          STATUS=${status}
          </div>
         `;

        DBTag_Class.appendChild(mainContainer);
     }
  }