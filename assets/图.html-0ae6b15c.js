import{_ as l,Q as i,S as e,a5 as o}from"./framework-ec2af7a3.js";const t={},a=o('<h1 id="图" tabindex="-1"><a class="header-anchor" href="#图" aria-hidden="true">#</a> 图</h1><p>图论基础：</p><p>无向图的权重邻接矩阵：</p><ol><li>无向图对应的权重邻接矩阵是一个对称矩阵（有向图一般不是对称的），其对角线上的元素为 0</li><li>$D_ij$ 表示第 i 个点到第 j 个节点的权重</li></ol><p>两个算法：</p><ol><li>迪杰斯特拉算法（可以用于有向图，但是不能处理负权重）</li><li>弗洛伊德算法（不支持含有负权重回路的图）</li><li>贝尔曼-福特算法（不支持含有负权重回路的图，但是可以处理具有负权重的「有向图」）</li></ol><p>什么是负权回路：</p><ol><li>在一个图中每条边都有一个权重（有正有负）</li><li>如果存在一个环，从某点出发最后又回到自己，而且环上的「所有权值和为负数」，那么就称为负权回路</li><li>存在负权回路的图不能求两点之间最短路径，因为只要在负权回路上不停绕圈，所得的最短长度可以任意小</li></ol>',8),c=[a];function _(r,n){return i(),e("div",null,c)}const d=l(t,[["render",_],["__file","图.html.vue"]]);export{d as default};
