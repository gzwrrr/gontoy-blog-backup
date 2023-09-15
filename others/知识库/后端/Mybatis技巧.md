# Mybatis 技巧

1. 插件： 实现 ParameterHandler、ResultSetHandler、StatementHandler、Executor 接口，原理是动态代理；或者实现 Interceptor 并覆盖 intercept 方法
2. 动态 SQL：标签包括 trim|where|set|foreach|if|choose|when|otherwise|bind，原理是使用 OGNL 从 SQL 参数对象中计算表达式的值，动态拼接 SQL

