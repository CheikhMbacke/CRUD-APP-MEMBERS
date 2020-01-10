const express = require('express');
const route = express.Router();
const Member = require('../models/Members');

route.get('/',(req, res)=>{
    res.render("membersViews/addOrEditMember",{
        viewTitle:"INSERT MEMBER"
    });
});

route.get('/allMembers',async (req,res)=>{
    await Member.find((err,allMembers)=>{
        if(err) throw err;
        res.render("membersViews/listMembers",{
            viewTitle: "MEMBERS LIST",
            members : allMembers
        });
        console.log('Data loading successfully !!');
    });
});

route.get('/:id',async (req,res)=>{
    await Member.findById({_id:req.params.id},(err,member)=>{
        if(err) throw err;
        res.json(member);
        console.log(`Data ${req.params.id} loading successfully !!`);
    });
});

route.patch('/update/:id',(req,res)=>{
    
 /*    await Member.findById({_id:req.params.id},async (err,member)=>{
        if(err) throw err;
        await Member.findByIdAndUpdate({_id:req.params.id},{
            nom: req.body.nom ? req.body.nom : member.nom,
            prenom: req.body.prenom ? req.body.prenom : member.prenom,
            Adresse: req.body.adresse ? req.body.adresse : member.Adresse
        });
        console.log(`Data ${req.params.id} updated successfully !!`);
        res.redirect('/members/allMembers');
    });*/
}); 

route.post('/add',async (req,res)=>{
    if(req.body._id == "")
        insertMember(req,res);
    else
        updateMember(req,res);
 });

route.get('/update/:id', async (req,res)=>{
    await Member.findById({_id:req.params.id},(err,member)=>{
        if(err) throw err;
        console.log(`Data ${req.params.id} loaded to update successfully !!`);
        /* res.redirect('/members/allMembers'); */
        res.render("membersViews/addOrEditMember",{
            viewTitle: "EDIT MEMBER",
            members : member 
        })
    });
});
route.get('/delete/:id',  (req,res)=>{
    deleteMember(req,res);
});

insertMember = async (req,res)=>{
    const newMember = new Member({
        nom:req.body.nom,
        prenom:req.body.prenom,
        Adresse:req.body.adresse
    });
    await newMember.save((err,memberAdded)=>{
        if (err) throw err;
        res.redirect('/members/allMembers');
        console.log('Data added successfully !!');
    });
}
updateMember = async (req,res)=>{
    const member = await Member.findById({_id:req.body._id});
    await Member.findByIdAndUpdate({_id:req.body._id},{
        nom: req.body.nom ? req.body.nom : member.nom,
        prenom: req.body.prenom ? req.body.prenom : member.prenom,
        Adresse: req.body.adresse ? req.body.adresse : member.Adresse
    },
    (err,member)=>{
        if(err) throw err;
        console.log(`Data ${req.params.id} updated successfully !!`);
        res.redirect('/members/allMembers');
    });
}
deleteMember = async (req,res)=>{
    await Member.findByIdAndRemove({_id:req.params.id},(err)=>{
        if(err) throw err;
        console.log(`Data ${req.params.id} deleted successfully !!`);
        res.redirect('/members/allMembers');
    });
}

module.exports = route ;
