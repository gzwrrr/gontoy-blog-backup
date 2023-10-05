---
title: "Java 通用"
shortTitle: "Java 通用"
description: "Java 通用"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-05-01
category: 
- "Java"
- "通用"
tag:
- "Java"
- "通用"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Java 通用"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 2
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "Java 通用"
  description: "Java 通用"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Java 通用

[[toc]]


### Hutool

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.9</version>
</dependency>
```





### XML 结构

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.xxxx.xxx.xxx.xxx">
    
</mapper>
```





### Knife4j

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version>
</dependency>
```

```java
@Configuration
@EnableSwagger2
public class Knife4jConfig {

    /**
     * 接口文档地址：ip:port/doc.html
     */
    @Bean(value = "defaultApi2")
    public Docket defaultApi2() {
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(new ApiInfoBuilder()
                        .title("knife4j API ")
                        .description("Payroll 接口信息")
                        .version("3.0")
                        .build())
                .groupName("payroll")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.edu.hqu.payroll"))
                .paths(PathSelectors.any())
                .build();
    }
}
```





### Easy Excel

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>3.2.0</version>
</dependency>
```

```java
public class ExcelUtils {

    private final static String ADDITION_HEADER = "Content-Disposition";

    private final static String CONTENT_TYPE = "application/vnd.ms-excel;charset=UTF-8";

    private final static String CHARSET = "UTF-8";

    /**
     * 将列表以 Excel 响应给前端
     * @param response 响应
     * @param filename 文件名
     * @param sheetName Excel sheet 名
     * @param head Excel head 头
     * @param data 数据列表哦
     * @param <T> 泛型，保证 head 和 data 类型的一致性
     */
    public static <T> void write(HttpServletResponse response, String filename, String sheetName,
                                 Class<T> head, List<T> data) {
        String header = response.getHeader(ADDITION_HEADER);
        String contentType = response.getContentType();
        try {
            response.addHeader(ADDITION_HEADER, String.format("attachment;filename=%s", URLEncoder.encode(filename, CHARSET)));
            response.setContentType(CONTENT_TYPE);
            // 输出 Excel
            EasyExcelFactory.write(response.getOutputStream(), head)
                    // 不要自动关闭，交给 Servlet 自己处理
                    .autoCloseStream(false)
                    // 基于 column 长度，自动适配。最大 255 宽度
                    .registerWriteHandler(new LongestMatchColumnWidthStyleStrategy())
                    .sheet(sheetName).doWrite(data);
        } catch (IOException e) {
            // 报错则复原
            response.setHeader(ADDITION_HEADER, header);
            response.setContentType(contentType);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 读取 Excel 文件
     * @param file 文件
     * @param head 表头
     * @return List<T> 读出到的对象列表
     * @param <T> 泛型，保证 head 和 data 类型的一致性
     */
    public static <T> List<T> read(MultipartFile file, Class<T> head)  {
        try {
            return EasyExcelFactory.read(file.getInputStream(), head, null)
                    // 不要自动关闭，交给 Servlet 自己处理
                    .autoCloseStream(false)
                    .doReadAllSync();
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

}
```





### Spring Valid

```xml
<!-- 参数校验 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

```java
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("department")
@ApiModel(value="Department对象", description="")
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "部门ID")
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    private String id;

    @ApiModelProperty(value = "部门名称")
    @NotNull(message = "部门名称不能为空")
    private String name;

    @ApiModelProperty(value = "部门人数")
    @NotNull(message = "部门人数不能低于0")
    @Min(value = 0, message = "部门人数必须大于等于0")
    private Integer number;

    @ApiModelProperty(value = "部门状态")
    @NotNull(message = "部门状态不能为空")
    private Integer state;

    @ApiModelProperty(value = "创建时间")
    @TableField(fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "Asia/Shanghai")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @ApiModelProperty(value = "编辑时间")
    @TableField(fill = FieldFill.INSERT_UPDATE)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "Asia/Shanghai")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime editTime;
}
```







## Mybatis Plus

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.2</version>
</dependency>
```



### 分页

```java
/**
 * Mybatis Plus 配置
 * @author gzw
 */
@Configuration
public class MybatisPlusConfig  {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.edu.hqu.payroll.mapper.DepartmentMapper">

    <!-- 通用查询映射结果 -->
    <resultMap id="BaseResultMap" type="com.edu.hqu.payroll.pojo.Department">
        <id column="id" property="id" />
        <result column="name" property="name" />
        <result column="number" property="number" />
        <result column="state" property="state" />
        <result column="create_time" property="createTime" />
        <result column="edit_time" property="editTime" />
    </resultMap>
    <sql id="Base_Column_List">
        id, name, number, state, create_time, edit_time
    </sql>
    <select id="selectDepartmentPage" resultType="com.edu.hqu.payroll.pojo.Department">
        SELECT <include refid="Base_Column_List"></include>
        FROM department
        ${ew.customSqlSegment}
    </select>
</mapper>
```

```java
public interface DepartmentMapper extends BaseMapper<Department> {
    IPage<Department> selectDepartmentPage(Page<Department> page, @Param(Constants.WRAPPER) Wrapper wrapper);
}
```

```java
@Service
public class DepartmentServiceImpl extends ServiceImpl<DepartmentMapper, Department> implements IDepartmentService {
    private final DepartmentMapper departmentMapper;
    public DepartmentServiceImpl(DepartmentMapper departmentMapper) {
        this.departmentMapper = departmentMapper;
    }
    @Override
    public IPage<Department> selectDepartmentPage(DepartmentQueryDTO departmentQueryDTO) {
        // 分页
        Page<Department> pageParam = new Page<>(departmentQueryDTO.getPage(), departmentQueryDTO.getLimit());

        // 查询条件
        QueryWrapper<Department> wrapper = new QueryWrapper<>();
        String departmentName = departmentQueryDTO.getName();
        LocalDateTime createTimeStart = departmentQueryDTO.getCreateTimeStart();
        LocalDateTime createTimeEnd = departmentQueryDTO.getCreateTimeEnd();
        LocalDateTime editTimeStart = departmentQueryDTO.getEditTimeStart();
        LocalDateTime editTimeEnd = departmentQueryDTO.getEditTimeEnd();
        if (Objects.nonNull(departmentName) && !"".equals(departmentName)) {
            wrapper.like("name", departmentName);
        }
        if (Objects.nonNull(createTimeStart)) {
            wrapper.le("createTime", createTimeStart);
        }
        if (Objects.nonNull(createTimeEnd)) {
            wrapper.ge("createTime", createTimeEnd);
        }
        if (Objects.nonNull(editTimeStart)) {
            wrapper.le("editTime", editTimeStart);
        }
        if (Objects.nonNull(editTimeEnd)) {
            wrapper.ge("editTime", editTimeEnd);
        }
        return departmentMapper.selectDepartmentPage(pageParam, wrapper);
    }
}
```

