declare global {
   /**
   * 全局自定义环境变量的类型声明
   * @see {@link https://pure-admin.github.io/pure-admin-doc/pages/config/#%E5%85%B7%E4%BD%93%E9%85%8D%E7%BD%AE}
   */
   interface ViteEnv {
    VITE_BASE_API: string;
  }
}