package com.grcms.pfingo.management.domain;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.grcms.core.form.BasicForm;
import com.grcms.management.user.domain.Menu;

@Entity
@Table(name="ec_news")
@Cacheable
public class News extends BasicForm implements Comparable<News>{
	
	
	@Id
	@GenericGenerator(name="idGenerator", strategy="uuid")
	@GeneratedValue(generator="idGenerator",strategy=GenerationType.AUTO)
	private String id;
	
	
	@Column(name="title")
	private String title;
	
	
	@Column(name="content")
	private String content;
	
	
	@Column(name="author")
	private String author;
	
	
	@Column(name="create_time")
	private String createTime;
	
	@Column(name="update_time")
	private String updateTime;
	
	@Column(name="type")
	private String type;
	
	

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public int compareTo(News o) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	

}
