//����expressģ��
const express=require('express');
//����pool.jsģ��
const pool=require('../pool.js');
//����·��������
const r=express.Router();
//1.���԰���Ϣ
//��ַ:127.0.0.1:8083/v1/user_message/reg
//����ʽ:post
r.post('/reg',(req,res,next)=>{
	//��ò���
	var obj=req.body
	console.log(obj)
	//�����ݲ��뵽���ݿ����
	pool.query('insert into zp_usermessage set?',[obj],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		console.log(result);
		//ִ�гɹ�����Ӧ
		res.send({code:200,msg:'Ա�����ӳɹ�'})
	})
});
//2.�������԰�ӿ�
//��ַ:127.0.0.1:8080/v1/user_message/info/:uid
//����ʽget
r.get('/info/:username',(req,res,next)=>{
	var obj=req.params;
	console.log(req.params)
	pool.query('select * from zp_usermessage where user=?',[obj.username],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.length===0){
			res.send({code:501,msg:'��ѯʧ��'});
		}else{
			res.send({code:200,msg:'��ѯ�ɹ�',data:result});
		}
	})
})
//3.ɾ�����԰���Ϣ
//��ַ��127.0.0.1:8083/v1/user_message/
//����ʽdelete
r.delete('/:uid',(req,res,next)=>{
	var obj = req.params;
	pool.query('delete from zp_usermessage where uid=?',[obj.uid],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.affectedRows===0){
			res.send({code:501,msg:'ɾ��ʧ��'});
		}else{
			res.send({code:200,msg:'ɾ���ɹ�'});
		}
	})
})
//4.�����ѯ�ӿ�
//��ַ:127.0.0.1:8083/v1/user_message/infos
//����ʽget
r.get('/infos',(req,res,next)=>{
	var obj=req.params;
	console.log(req.params)
	pool.query('select * from zp_usermessage',[obj],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.length===0){
			res.send({code:501,msg:'��ѯʧ��'});
		}else{
			res.send({code:200,msg:'��ѯ�ɹ�',data:result});
		}
	})
})
//��¶·��������
module.exports=r;