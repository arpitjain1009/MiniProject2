import { ContactService } from './contact.service';
import { Contact } from './contact';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component
({
  selector: 'app-contacts',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact:Contact;
  contactlist:Contact[];
  
  sortDesc:boolean;
  myForm:FormGroup;
  showinsert:boolean;
  updating:boolean;
  searchbox:string;
  constructor(private contactSer: ContactService ) 
  { this.updating=false;
    this.sortDesc=true;
    this.showinsert=false;
    this.contact=new Contact();
    this.contactlist=[];
    this.contactlist=this.contactSer.returncontactlist();
    this.myForm=new FormGroup({
      firstName:new FormControl(null, Validators.required),
      secondName:new FormControl(null, Validators.required),
      phone:new FormControl(null, Validators.required)
    });

  }
  public get firstName()
  {
    return this.myForm.get('firstName');
  }
  public get secondName()
  {
    return this.myForm.get('secondName');
  }
  public get phone()
  {
    return this.myForm.get('phone');
  }

   addtocontact()
   {
    console.log(this.myForm);
    if(this.myForm.valid)
    {
    this.contact.firstName=this.firstName.value;
    this.contact.secondName=this.secondName.value;
    this.contact.phone=this.phone.value;
    this.contactSer.addcontact(this.contact);
      this.myForm.reset();
    this.contactlist=this.contactSer.returncontactlist();
    this.showinsert=false;
    this.contact=new Contact();    
     }    
    }


   insert()
   {
     this.showinsert=false;
   }


  updatepopup(c)
  { this.contact=new Contact();
    this.updating=true;
    this.contact.firstName=c.firstName;
    this.contact.secondName=c.secondName;
    this.contact.phone=c.phone;
  }

  updatecontact(fname, sname, pnum)
  { if(pnum.value!="")
    {
    this.contact=new Contact();
    this.contact.firstName=fname.value;
    this.contact.secondName=sname.value;
    this.contact.phone=pnum.value;
    this.contactlist=this.contactSer.updatetocontact(this.contact);
    this.updating=false;
    }
  }
  sortarray()
{   this.sortDesc=!this.sortDesc;
    this.contactlist=this.contactSer.sortarray(this.sortDesc);
}
showpopup()
{
  this.showinsert=true;
}
hideupdate()
{
  this.updating=false;
}
   deletefromlist(num)
   {
     
     this.contactlist=this.contactSer.delete(num);
    
   }
  ngOnInit(): void {
  }

search()
{ 
  if(this.searchbox!="")
  {
    this.contactlist=this.contactSer.searchcontacts(this.searchbox);
  }
  else
  {
    this.contactlist=this.contactSer.returncontactlist();
  }
}

}
