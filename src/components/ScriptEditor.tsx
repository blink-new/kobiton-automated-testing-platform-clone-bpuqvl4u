import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Download, 
  Copy, 
  Play, 
  Settings, 
  Code, 
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface ScriptEditorProps {
  script: string
  language: string
  onLanguageChange: (language: string) => void
}

export function ScriptEditor({ script, language, onLanguageChange }: ScriptEditorProps) {
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle')

  const validateScript = () => {
    setValidationStatus('validating')
    // Simulate validation
    setTimeout(() => {
      setValidationStatus('success')
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script)
  }

  const downloadScript = () => {
    const element = document.createElement('a')
    const file = new Blob([script], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `appium_test.${language === 'java' ? 'java' : language === 'python' ? 'py' : 'js'}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getScriptForLanguage = (lang: string) => {
    const scripts = {
      java: `// Auto-generated Appium Test Script (Java)
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

public class LoginTest {
    private AppiumDriver driver;
    
    @Test
    public void testUserLogin() {
        // AI detected login flow pattern
        WebElement emailField = driver.findElement(By.id("email_input"));
        emailField.sendKeys("user@example.com");
        
        WebElement passwordField = driver.findElement(By.id("password_input"));
        passwordField.sendKeys("password123");
        
        WebElement loginButton = driver.findElement(By.xpath("//android.widget.Button[@text='Login']"));
        loginButton.click();
        
        // AI verified success pattern
        WebElement welcomeMessage = driver.findElement(By.id("welcome_text"));
        assert(welcomeMessage.isDisplayed());
    }
}`,
      python: `# Auto-generated Appium Test Script (Python)
from appium import webdriver
from selenium.webdriver.common.by import By
import unittest

class LoginTest(unittest.TestCase):
    def setUp(self):
        # Driver setup would be here
        pass
    
    def test_user_login(self):
        # AI detected login flow pattern
        email_field = self.driver.find_element(By.ID, "email_input")
        email_field.send_keys("user@example.com")
        
        password_field = self.driver.find_element(By.ID, "password_input")
        password_field.send_keys("password123")
        
        login_button = self.driver.find_element(By.XPATH, "//android.widget.Button[@text='Login']")
        login_button.click()
        
        # AI verified success pattern
        welcome_message = self.driver.find_element(By.ID, "welcome_text")
        assert welcome_message.is_displayed()

if __name__ == '__main__':
    unittest.main()`,
      javascript: `// Auto-generated Appium Test Script (JavaScript)
const { remote } = require('webdriverio');

describe('Login Test', () => {
    let driver;
    
    beforeAll(async () => {
        // Driver setup would be here
    });
    
    it('should login user successfully', async () => {
        // AI detected login flow pattern
        const emailField = await driver.$('#email_input');
        await emailField.setValue('user@example.com');
        
        const passwordField = await driver.$('#password_input');
        await passwordField.setValue('password123');
        
        const loginButton = await driver.$('//android.widget.Button[@text="Login"]');
        await loginButton.click();
        
        // AI verified success pattern
        const welcomeMessage = await driver.$('#welcome_text');
        expect(await welcomeMessage.isDisplayed()).toBe(true);
    });
});`
    }
    return scripts[lang as keyof typeof scripts] || scripts.java
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-blue-600" />
              <span>Generated Script</span>
            </CardTitle>
            <CardDescription>
              AI-generated Appium test script ready for use
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="code" className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto max-h-96">
              <pre className="text-sm text-slate-100 font-mono">
                <code>{getScriptForLanguage(language)}</code>
              </pre>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Generated
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-200">
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={validateScript}>
                  <Play className="w-4 h-4 mr-2" />
                  Validate
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={downloadScript}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="validation" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Script Validation</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={validateScript}
                  disabled={validationStatus === 'validating'}
                >
                  {validationStatus === 'validating' ? 'Validating...' : 'Run Validation'}
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Syntax Check</p>
                    <p className="text-sm text-green-700">Valid {language} syntax</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Element Locators</p>
                    <p className="text-sm text-green-700">All locators are optimized</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Wait Conditions</p>
                    <p className="text-sm text-blue-700">Implicit waits added automatically</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}