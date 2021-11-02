# STENCIL v1.0.0
**A web engine for visualizing and sharing life science datasets**

Qi Sun<sup>1</sup><sup>+</sup>, Ali Nematbakhsh<sup>1</sup><sup>+</sup>, Prashant K Kuntala<sup>2</sup>, Gretta Kellogg<sup>1</sup>, B. Franklin Pugh<sup>3</sup>, and William KM Lai<sup>3</sup><sup>*</sup>

<sup>1</sup>Cornell Institute of Biotechnology, Cornell University, Ithaca, New York 14850, USA<br /><sup>2</sup>Department of Biochemistry and Molecular Biology, The Pennsylvania State University, University Park, Pennsylvania 16802, USA<br /><sup>3</sup>Department of Molecular Biology and Genetics, Cornell University, New York 14850, USA.

<sup>+</sup>Co-first authors
<sup>+</sup>To whom correspondence should be addressed.
Contact: *wkl29@cornell.edu*

The ability to aggregate experimental data analysis and results into a concise and interpretable format is a key step in evaluating the success of an experiment. This critical step determines baselines for reproducibility and is a key requirement for data dissemination. However, in practice it can be difficult to consolidate data analyses that encapsulates the broad range of datatypes available in the life sciences. We present STENCIL, a web templating engine designed to organize, visualize, and enable the sharing of interactive data visualizations. STENCIL leverages a flexible web framework for creating templates to render highly customizable visual front ends. This flexibility enables researchers to render small or large sets of experimental outcomes, producing high-quality downloadable and editable figures that retain their original relationship to the source data. REST API based back ends provide programmatic data access and supports easy data sharing. STENCIL is a lightweight tool that can stream data from Galaxy, a popular bioinformatic analysis web platform. STENCIL has been used to support the analysis and dissemination of two large scale genomic projects containing the complete data analysis for over 2,400 distinct datasets. Code and implementation details are available on GitHub: https://github.com/CEGRcode/stencil 

## Citation
STENCIL: A web templating engine for visualizing and sharing life science datasets<br />
Qi Sun, Ali Nematbakhsh, Prashant K Kuntala, Gretta Kellogg, B. Franklin Pugh, William KM Lai<br />
bioRxiv 2021.06.04.447108; doi: https://doi.org/10.1101/2021.06.04.447108

## Documentation
Extended documentation available here:
http://pughlab.mbg.cornell.edu/stencil/

Quickstart:

1. Start MongoDB server.

2. Download source code:

   ```
   git clone https://github.com/CEGRcode/stencil.git
   ```

3. Install dependencies.

   ```
   cd stencil/backend
   npm install

   cd stencil/frontend
   npm install

   cd ..
   ```

4. Start the backend and frontend server.

   ```
   screen

   cd stencil/backend

   npm start

   #press ctrl-a c to switch screen

   cd stencil/frontend
   npm start
   ```

4. Post example data.

   Modify the postData.py and postLibrary.py located in stencil/backend/utils.

   Replace the URL from "http://localhost/samples" to appropriate backend URL.

   ```
   cd stencil/backend/utils

   sh post_all.sh
   ```

5. Access STENCIL.
   
   Open browser and navigate to:

   URL:  http://localhost:3000

   If opening STENCIL for the first time, initialize the admin user account to access STENCIL.

### Notes

   Locally hosted data files stored in stencil are kept under:<br />
   stencil/backend/sampleData/localdata<br />
   The folder structure is arbitrary and can be organized into sub-directories.<br />
   The locally hosted file path is set in the backed .env file<br />
   Locally hosted images can be directly viewed at: http//localhost:8081/images/subDirection/myImage.png
