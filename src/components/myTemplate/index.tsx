import { useEffect, useState, FC, memo, createContext, useMemo } from 'react';
import { Select, Input, Tree, Checkbox } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { RealContainer, RealOptionContainer } from './style';
import { getRegionTreeList } from '@/apis';
import { typeList } from '@/commonInterface';
import { useImmer } from 'use-immer';
import { DataNode } from 'antd/lib/tree';
const { Option } = Select;

export interface templageProps {
  energyType: number;
  area: number[];
  areaName: string;
}

const defaultData = {
  energyType: 1,
  area: [2],
  areaName: 'AA1',
};

type IProps = {
  isIncludeChildren?: boolean;
};

// 创造一个上下文
export const TemplateContext = createContext<templageProps>(defaultData);

const MyTemplate: FC<IProps> = memo(({ children, isIncludeChildren }) => {
  const [contextProps, setContextProps] = useImmer(defaultData);
  const onChange = (key: string) => {
    const ck = parseInt(key);
    setContextProps((p) => {
      p.energyType = ck;
    });
  };

  const onSelectAreaChange = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
    setContextProps((p) => {
      p.area = [parseInt(info?.id) || 1];
      p.areaName = [info?.node?.name || ''];
    });
  };

  return (
    <TemplateContext.Provider value={contextProps}>
      <RealContainer>
        <RealOption
          onChange={onChange}
          onSelectAreaChange={onSelectAreaChange}
          templageData={contextProps}
        />
        {children}
      </RealContainer>
    </TemplateContext.Provider>
  );
});

type RealOptionProps = {
  onChange: (e: string) => void;
  onSelectAreaChange: (selectedKeys: React.Key[], info: any) => void;
  templageData: templageProps;
};

export const RealOption: FC<RealOptionProps> = memo(
  ({ onChange, onSelectAreaChange, templageData }) => {
    const [tree, setTree] = useState<any>([]);
    const [nodeName, setNodeName] = useState(templageData.areaName);
    const [expandedKeys, setExpandedKeys] = useState<any>();
    const [checkedKeys, setCheckedKeys] = useState<any>();
    const [selectAll, setSelectAll] = useState(false);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [allKeys, _setAllKeys] = useState<any>({
      obj: [],
      arr: [],
    });
    const formatTreeData = (data: any) => {
      data.map((item: any) => {
        item.title = item.name;
        item.key = item.id;
        allKeys.obj.push({ key: item.id, title: item.name });
        allKeys.arr.push(item.id);
        if (item.children && item.children.length) {
          formatTreeData(item.children);
        }
      });
    };

    const onSelectNodeChange = (selectedKeys: React.Key[], info: any) => {
      onSelectAreaChange(selectedKeys, info);
      onCheckNodeBox(selectedKeys, info);
    };

    const onChangeName = (e: any) => {
      const value = e?.target?.value;
      setNodeName(value);
    };

    const getNodeList = (nodeName: string) => {
      getRegionTreeList().then((res: any) => {
        if (res?.meta?.code === 200) {
          const data = res.data;
          formatTreeData(data);
          setTree([...data]);
          allKeys.obj.map((item: any) => {
            if (item?.title === nodeName) {
              setCheckedKeys([item?.key]);
              setExpandedKeys([item?.key]);
            }
          });
        }
      });
    };
    const onCheckNodeBox = (
      checked:
        | React.Key[]
        | {
            checked: React.Key[];
            halfChecked: React.Key[];
          },
      info: any,
    ) => {
      setCheckedKeys(checked);
      setExpandedKeys(checked);
      console.log(checked, 'check');
      console.log(info, 'check');
    };

    const onCheckboxShift = (all: boolean) => {
      setSelectAll(all);
      if (all) {
        setCheckedKeys(allKeys.arr);
        setExpandedKeys(allKeys.arr);
      } else {
        setCheckedKeys([]);
      }
    };

    const onExpand = (newExpandedKeys: any[]) => {
      setExpandedKeys(newExpandedKeys);
      setAutoExpandParent(false);
    };

    // const treeData = useMemo(() => {
    //   const loop = (data: DataNode[]): DataNode[] =>
    //     data.map(item => {
    //       const strTitle = item.title as string;
    //       const index = strTitle.indexOf(nodeName);
    //       const beforeStr = strTitle.substring(0, index);
    //       const afterStr = strTitle.slice(index + nodeName.length);
    //       const title =
    //         index > -1 ? (
    //           <span>
    //             {beforeStr}
    //             <span className="site-tree-search-value">{nodeName}</span>
    //             {afterStr}
    //           </span>
    //         ) : (
    //           <span>{strTitle}</span>
    //         );
    //       if (item.children) {
    //         return { title, key: item.key, children: loop(item.children) };
    //       }

    //       return {
    //         title,
    //         key: item.key,
    //       };
    //     });

    //   return loop(tree);
    // }, [tree, nodeName]);

    useEffect(() => {
      getNodeList(nodeName);
    }, []);

    useEffect(() => {
      let expandKeys: any[] = [];
      if (nodeName) {
        allKeys.obj.map((item: any) => {
          nodeName.split('，').map((name: string) => {
            if (item?.title === name) {
              expandKeys.push(item?.key);
            }
          });
        });
      } else {
        expandKeys = allKeys.arr;
      }
      setExpandedKeys(expandKeys);
    }, [nodeName]);

    return (
      <RealOptionContainer>
        <Select
          size="large"
          defaultValue={templageData.energyType as any}
          onChange={onChange}
        >
          {typeList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Input
          size="large"
          suffix={<SearchOutlined />}
          placeholder="节点名称"
          value={nodeName}
          onChange={onChangeName}
        />
        <div className="radioGroup">
          <Checkbox
            onChange={() => {
              onCheckboxShift(false);
            }}
            checked={!selectAll}
          >
            是否级联
          </Checkbox>
          <Checkbox
            onChange={() => {
              onCheckboxShift(true);
            }}
            checked={selectAll}
          >
            全选
          </Checkbox>
        </div>
        <Tree
          onSelect={onSelectNodeChange}
          onCheck={onCheckNodeBox}
          treeData={tree}
          checkable
          autoExpandParent={autoExpandParent}
          defaultExpandAll
          defaultExpandParent
          expandedKeys={expandedKeys}
          checkedKeys={checkedKeys}
          onExpand={onExpand}
          showLine
          icon={<PlusOutlined />}
        />
      </RealOptionContainer>
    );
  },
);

MyTemplate.displayName = 'MyTemplate';

export default MyTemplate;
