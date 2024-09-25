<template>
  <v-footer height="40" app class="bg">
    <div class="text-caption text-disabled" style="position: absolute; left: 16px;">
      <label class="d-none d-sm-inline-block" style="color: black;">
        <label>&copy;</label>
        <label v-if="(new Date()).getFullYear() != 2024"> 2024 - </label>
         {{ (new Date()).getFullYear() }} 
        <label>TayarPro. All rights reserved.</label>
      </label>
    </div> 

    <div class="text-caption text-disabled d-sm-inline-block" style="position: absolute; right: 16px;">
      <label class="border-right" style="color: #646464;" @click="showPPDialog = true">
        Privacy Policy
      </label>
      <label class="border-right" style="color: #646464; padding-left: 7px;" @click="showGTDialog = true">
        General Terms
      </label>
      <label style="color: #646464; padding-left: 7px;" @click="showSMDialog = true">
        Sitemap
      </label>
    </div> 
  </v-footer>

  <v-dialog v-model="showPPDialog" width="500" scrollable>
    <v-card>
      <v-card-title>
        Privacy Policy
      </v-card-title>
      <v-card-text>
        Sample Privacy Policy

[Your Company Name] is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, [website address], and our services.


1. Information We Collect


We collect information that you provide to us directly, such as:


Personal Information: Name, email address, phone number, address, payment information, and other information you provide when you create an account, make a purchase, contact us, or participate in our services.

Usage Data: Information about how you use our website and services, including your browsing activity, device information, and interactions with our features.

2. How We Use Your Information


We use your information to:


Provide and improve our services: To deliver the services you request, personalize your experience, and improve our website and services.

Process transactions: To process your orders, payments, and other transactions.

Communicate with you: To send you important information about our services, respond to your inquiries, and provide customer support.

Marketing and advertising: To send you promotional materials, offers, and updates about our services, subject to your consent.

Analytics and research: To analyze website traffic, understand user behavior, and improve our services.

3. Sharing Your Information


We may share your information with:


Service providers: Third-party companies that provide services to us, such as payment processing, data analytics, and customer support.

Legal obligations: To comply with legal requirements, court orders, or government requests.

Business transfers: If we are involved in a merger, acquisition, or sale of assets, your information may be transferred to the new owner.

4. Your Privacy Choices


You have the following choices regarding your information:


Account settings: You can access and update your personal information in your account settings.

Opt-out of marketing: You can opt-out of receiving marketing communications from us by following the instructions in the emails we send you.

Cookies and tracking: You can manage your cookie preferences through your browser settings.

5. Data Security


We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or online service is completely secure.


6. Children's Privacy


Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.


7. Changes to this Privacy Policy


We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website.


8. Contact Us


If you have any questions about this Privacy Policy, please contact us at [email address].


Last Updated: [Date]


Please note: This is a sample privacy policy and may not be suitable for all businesses. You should consult with a legal professional to ensure that your privacy policy complies with all applicable laws and regulations.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="showPPDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showGTDialog" width="500" scrollable>
    <v-card>
      <v-card-title>
        General Terms
      </v-card-title>
      <v-card-text>
        Sample General Terms and Conditions

1. Introduction


These General Terms and Conditions ("Terms") govern your access to and use of the website [website address] ("Website") and the services offered by [Your Company Name] ("Company"). By accessing or using the Website or services, you agree to be bound by these Terms.


2. Definitions


"Content" means any text, graphics, images, videos, audio, software, data, or other materials that are available on the Website.

"Services" means the features and functionalities offered on the Website, including but not limited to [list specific services].

"User" means any individual or entity accessing or using the Website or Services.

3. Use of the Website and Services


You must be at least [age] years old to use the Website and Services.

You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.

You agree not to use the Website or Services for any unlawful or unauthorized purpose, including but not limited to:

Violating any local, state, national, or international law or regulation.

Infringing upon the intellectual property rights of others.

Transmitting any harmful content, including viruses, malware, or other destructive code.

Interfering with or disrupting the Website or Services.

Attempting to gain unauthorized access to the Website or Services.


4. Intellectual Property


The Content on the Website is protected by copyright, trademark, and other intellectual property laws.

You may not reproduce, modify, distribute, or commercially exploit any Content without the express written permission of the Company.

5. Disclaimer


The Website and Services are provided "as is" and without warranty of any kind, express or implied.

The Company disclaims all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.

The Company does not warrant that the Website or Services will be uninterrupted or error-free, that defects will be corrected, or that the Website or Services are free of viruses or other harmful components.

6. Limitation of Liability


The Company will not be liable for any damages arising from your use of the Website or Services, including but not limited to direct, indirect, incidental, consequential, and punitive damages.

You agree to indemnify and hold harmless the Company, its officers, directors, employees, agents, and licensors from and against any and all claims, demands, losses, liabilities, costs, and expenses (including attorney's fees) arising out of or relating to your use of the Website or Services.

7. Termination


The Company may terminate your access to the Website or Services at any time for any reason.

You may terminate your account at any time.

8. Governing Law


These Terms will be governed by and construed in accordance with the laws of [State/Country].

9. Entire Agreement


These Terms constitute the entire agreement between you and the Company regarding your use of the Website and Services.

10. Amendments


The Company may amend these Terms at any time by posting the amended Terms on the Website.

Your continued use of the Website or Services after the posting of the amended Terms constitutes your acceptance of the amended Terms.

11. Contact Us


If you have any questions about these Terms, please contact us at [email address].

Please note: This is a sample general terms and conditions agreement and may not be suitable for all businesses. You should consult with a legal professional to ensure that your terms and conditions comply with all applicable laws and regulations.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="showGTDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showSMDialog" width="500" scrollable>
    <v-card>
      <v-card-title>
        Sitemap
      </v-card-title>
      <v-card-text>
        Sample Sitemap for [Your Website Name]

Homepage:


[website address]

About Us:


[website address]/about-us

Services:


[website address]/services

[website address]/services/service-1

[website address]/services/service-2

[website address]/services/service-3


Blog:


[website address]/blog

[website address]/blog/post-1

[website address]/blog/post-2

[website address]/blog/post-3


Contact Us:


[website address]/contact-us

Resources:


[website address]/resources

[website address]/resources/resource-1

[website address]/resources/resource-2

[website address]/resources/resource-3


Privacy Policy:


[website address]/privacy-policy

Terms of Service:


[website address]/terms-of-service

FAQ:


[website address]/faq

This is a sample sitemap and should be customized to reflect the specific structure and content of your website.


Here are some additional tips for creating a sitemap:


Use clear and concise language: Make sure your sitemap is easy to understand and navigate.

Include all important pages: Ensure that all essential pages on your website are listed in the sitemap.

Organize pages logically: Group related pages together to make it easier for users to find what they're looking for.

Keep it updated: Regularly update your sitemap to reflect any changes to your website's structure or content.

You can also use a sitemap generator tool to automatically create a sitemap for your website.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="showSMDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
  export default {
  data() {
    return {
      showPPDialog: false,
      showGTDialog: false,
      showSMDialog: false,
    };
  }
}
  
</script>

<style scoped>
  .bg {
    background: #FFE2E5;
  }

  .border-right {
    border-right: 2px solid #646464;
    padding-right: 5px;
  }

</style>
