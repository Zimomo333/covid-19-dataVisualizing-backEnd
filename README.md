# 全球疫情数据统计系统

### 一、项目技术

1. 使用Spring的RestTemplate工具类爬取网络数据；
2. Spring计划任务功能；
3. Apache Commons CSV组件解释CSV文件；
4. Java 8的Stream API处理集合类型数据；
5. Vue.js前端框架

5. 百度地图 + Echarts 绘制疫情分布地图

6. Element-UI 表格实现数据搜索、排序

### 二、项目环境

1. JDK 1.8或更高版本
2. Maven 3.6+
3. IntelliJ IDEA
4. commons-csv 1.8+
5. Vue.js 2.6

### 三、项目流程

1. 创建Spring Boot项目，添加功能模块：spring MVC、lombok、commons-csv。

   依赖如下：

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
   
   <dependency>
       <groupId>org.projectlombok</groupId>
       <artifactId>lombok</artifactId>
       <optional>true</optional>
   </dependency>
   <dependency>
       <groupId>org.apache.commons</groupId>
       <artifactId>commons-csv</artifactId>
       <version>1.8</version>
   </dependency>
   ```

   

2. 分析csv文件的数据结构，定义实体类。

   ```java
   @Data
   public class comfirmedCase {
       private String province;
       private String country;
       private double latitude;    //纬度
       private double longitude;   //经度
       private int total;
       private int diffFromPreDay;
   }
   ```

   

3. 使用RestTemplate工具类爬取爬取全球冠状病毒实时统计数据。

   注意：使用HTTP客户端请求Gitee上的文件时，需要设置一个请求头部User-Agent，否则会报403异常。

   代码说明：

   ① 实例化RequestEntity对象，设置请求头部。

   ② 通过RestTemplate的exchange方法获取csv文件，并封装到一个Resource对象中。

   ③ 通过Resource对象的getInputStream方法获取csv文件的输入流。

   ④ Commons CSV组件解释CSV文件的输入流，保存到实体类集合中。

   ```java
   @Service
   public class getDataService {
   
       private List<comfirmedCase> comfirmedCaseList= new ArrayList<comfirmedCase>();
   
       String COVID_DATA_URL = "https://gitee.com/dgut-sai/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
   
       RequestEntity<Void> requestEntity = RequestEntity
               .get(URI.create(COVID_DATA_URL))
               .headers(httpHeaders -> httpHeaders.add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"))
               .build();
   
       @PostConstruct      //spring容器初始化时自动执行一次该方法
       @Scheduled(cron = "0 0 0 * * *")        //计划任务，定期执行方法更新数据
       public void initData() throws IOException {
   
           ResponseEntity<Resource> exchange = new RestTemplate().exchange(requestEntity, Resource.class);
           Resource body = exchange.getBody();
   
           comfirmedCaseList.clear();  //清空数组
           Reader reader = new InputStreamReader(body.getInputStream());
           Iterable<CSVRecord> records = CSVFormat.RFC4180.withFirstRecordAsHeader().parse(reader);
           for (CSVRecord record : records) {
               comfirmedCase comfirmedCase = new comfirmedCase();
               comfirmedCase.setProvince(record.get("Province/State"));
               comfirmedCase.setCountry(record.get("Country/Region"));
               comfirmedCase.setLatitude(Double.parseDouble(record.get("Lat")));
               comfirmedCase.setLongitude(Double.parseDouble(record.get("Long")));
               comfirmedCase.setTotal(Integer.parseInt(record.get(record.size()-1)));
               comfirmedCase.setDiffFromPreDay(comfirmedCase.getTotal()-Integer.parseInt(record.get(record.size()-2)));
               comfirmedCaseList.add(comfirmedCase);
           }
   
       }
   
       public List<comfirmedCase> getComfirmedCaseList() {
           return comfirmedCaseList;
       }
   }
   ```

   

4. 使用Spring框架的计划任务功能定时更新统计数据。

   首先在配置类上添加 @EnableScheduling 注解来开启对计划任务的支持，然后在要执行计划任务的方法上注解 @Scheduled，声明这是一个计划任务。

   配置了每天凌晨0点执行定时任务，更新统计数据：

   ```java
   @Scheduled(cron = "0 0 0 * * *")        //计划任务，定期执行方法更新数据
   public void initData() throws IOException {...}
   ```

   

5. 使用@PostConstruct确保应用程序启动时，获取一次统计数据。

   ```java
   @PostConstruct      //spring容器初始化时自动执行一次该方法
   @Scheduled(cron = "0 0 0 * * *")        //计划任务，定期执行方法更新数据
   public void initData() throws IOException {...}
   ```

   

6. 定义Cotroller控制器

   定义一个控制器，用于返回数据给前端展示，支持查询功能。

   利用Java 8 Stearm数据流新特性，filter方法设置过滤条件来实现查询功能，sorted方法实现排序。

   ```java
   @Controller
   public class covidController {
   
       @Autowired
       getDataService getDataService;
   
       @RequestMapping("/")
       public String covidIndex(){
           return "index.html";
       }
   
       @RequestMapping("/getData")
       @ResponseBody
       public List<comfirmedCase> getData(){
           return getDataService.getComfirmedCaseList().stream().sorted(Comparator.comparing(comfirmedCase::getTotal).reversed()).collect(Collectors.toList());
       }
   
       @RequestMapping("/search")
       @ResponseBody
       public List<comfirmedCase> search(String country){
           if(country.equals(""))
               return getDataService.getComfirmedCaseList().stream().sorted(Comparator.comparing(comfirmedCase::getTotal).reversed()).collect(Collectors.toList());
           else
               return getDataService.getComfirmedCaseList().stream().filter(s->s.getCountry().equals(country)).collect(Collectors.toList());
       }
   }
   ```
   
   

7. 单元测试

   ```java
   @SpringBootTest
   class Covid19ApplicationTests {
   
       @Autowired
       getDataService getDataService;
   
       @Autowired
       covidController covidController;
   
       @Test
       void contextLoads() throws IOException {
           System.out.println(getDataService.getComfirmedCaseList());
           System.out.println(covidController.getData());
           System.out.println(covidController.search("China"));
       }
   
   }
   ```

   <div align=center>
       <img src="https://raw.githubusercontent.com/Zimomo333/covid-19-dataVisualizing-backEnd/master/picture/test.png"></div>

   
   
8. 前端展示

   前端使用Vue渲染引擎和Element-UI组件，支持排序功能。

   利用Echarts结合百度地图实现数据可视化
   
<div align=center>
       <img src="https://raw.githubusercontent.com/Zimomo333/covid-19-dataVisualizing-backEnd/master/picture/index.png"></div>




   查询功能

   <div align=center>
       <img src="https://raw.githubusercontent.com/Zimomo333/covid-19-dataVisualizing-backEnd/master/picture/search.png"></div>