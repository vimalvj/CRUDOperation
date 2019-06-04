import { Component, OnInit, Input, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})



export class CRUDComponent implements OnInit {
  id=1;
  @Input() jobtitle = {id:'',firstname:'', Lastname:'', emailid:'', dob:Date, address:'' }
  displayedColumns: string[] = ['id','Firstname', 'Lastname', 'emailid', 'dob','address','actions'];
  dataSource = new BehaviorSubject([]);
  public modalRef: BsModalRef;
  change;
  constructor( private bsModalService: BsModalService) {
   }
  ngOnInit() {
  }

  public openVerticallyCentered(content: TemplateRef<BsModalRef>) {
    this.jobtitle.firstname='';
      this.jobtitle.Lastname='';
      this.jobtitle.emailid='';
      this.jobtitle.dob=Date;
      this.jobtitle.address='';
    this.modalRef = this.bsModalService.show(content);
    
   
  }

  saveJob(){
  
    this.dataSource.next([...this.dataSource.getValue(), {id:this.id,firstname:this.jobtitle.firstname,Lastname:this.jobtitle.Lastname,emailid:this.jobtitle.emailid,dob:this.jobtitle.dob, address:this.jobtitle.address}]);
    localStorage.setItem('Users', JSON.stringify(this.dataSource.getValue()));
    this.id=this.id+1;
    this.modalRef.hide();
    //console.log(this.dataSource.getValue());
    //console.log({firstname:this.jobtitle.firstname});
  }

  editJob(id){
    var user= JSON.parse(localStorage.getItem("Users"));
  this.change= {id:this.jobtitle.id,firstname:this.jobtitle.firstname,Lastname:this.jobtitle.Lastname,emailid:this.jobtitle.emailid,dob:this.jobtitle.dob, address:this.jobtitle.address}
 console.log(user);
      for (let i = 0; i < user.length; i++) {
        if (id == user[i].id) {
          //console.log(user[i]);
          user.splice(i, 1);
          console.log(user);
      user.push(this.change);
      localStorage.setItem('Users', JSON.stringify(user));
      this.dataSource.next(user);
      this.modalRef.hide();
        }
      }

  
  }

  editjobs(editcontent:any,firstname,Lastname,emailid,dob,address,id){
    this.jobtitle.firstname=firstname;
    this.jobtitle.Lastname=Lastname;
    this.jobtitle.emailid=emailid;
    this.jobtitle.dob=dob;
    this.jobtitle.address=address;
    this.jobtitle.id=id;
   
  this.modalRef = this.bsModalService.show(editcontent);

  }

  deleteItem(id){
    if(confirm('Are you sure you want to delete this task?')) {
      var user= JSON.parse(localStorage.getItem("Users"));
      console.log(user);
      console.log(user.length);
  for (let i = 0; i < user.length; i++) {
    console.log(id);
    console.log(user[i].id);
    if (id == user[i].id) {
      console.log(i);
      user.splice(i, 1);
      this.dataSource.next(user);
      localStorage.setItem('Users', JSON.stringify(user));
    }
  }
    }
 
  }

}

