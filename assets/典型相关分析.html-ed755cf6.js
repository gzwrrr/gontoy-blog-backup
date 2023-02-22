import{_ as e,Q as o,S as t,a5 as l}from"./framework-ec2af7a3.js";const a={},i=l('<h1 id="典型相关分析" tabindex="-1"><a class="header-anchor" href="#典型相关分析" aria-hidden="true">#</a> 典型相关分析</h1><p>研究两组变量（魅族变量中都可能有多个指标）之间相关关系的一种多元统计方法，能够揭示出两组变量之间的内在联系</p><p>基本思想和主成分分析非常相似（后者用于降维）：</p><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//建模/20230207/典型相关分析的定义.png" alt="image-20230207224347160" style="zoom:50%;"><p>样本典型相关变量分析：</p><ol><li>计算样本典型相关变量以及典型相关系数</li><li>相关系数的显著性检验</li></ol><p>典型相关性分析中的问题：</p><ol><li>相关矩阵出发计算典型相关（先标准化消除量纲的影响）</li><li>典型载荷分析（原始变量与典型变量之间的相关性分析）</li><li>典型冗余分析（定量测度典型变量锁包含的原始信息的大小，这个使用的较少）</li></ol><p>补充：这里如果使用 SPSS 进行分析，会给出上述所有相关的结果（需要有 Python 环境）</p>',9),s=[i];function c(n,_){return o(),t("div",null,s)}const p=e(a,[["render",c],["__file","典型相关分析.html.vue"]]);export{p as default};
